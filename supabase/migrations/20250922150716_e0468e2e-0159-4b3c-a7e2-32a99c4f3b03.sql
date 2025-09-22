-- Create enum types
CREATE TYPE public.user_role AS ENUM ('patient', 'seller', 'admin');
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE public.sale_type AS ENUM ('product', 'service', 'voucher');
CREATE TYPE public.payment_method AS ENUM ('cash', 'card', 'transfer');
CREATE TYPE public.product_category AS ENUM ('dermato-cosmetice', 'suplimente', 'vouchere');

-- Create clinics table
CREATE TABLE public.clinics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    date_of_birth DATE,
    role user_role DEFAULT 'patient',
    clinic_id UUID REFERENCES public.clinics(id),
    commission_rate DECIMAL(5,2) DEFAULT 0,
    total_sales DECIMAL(10,2) DEFAULT 0,
    total_commission DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id)
);

-- Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    category product_category NOT NULL,
    image_url TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create inventory table (stock per clinic)
CREATE TABLE public.inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    clinic_id UUID REFERENCES public.clinics(id) ON DELETE CASCADE NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    min_stock_alert INTEGER DEFAULT 5,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(product_id, clinic_id)
);

-- Create appointments table
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    clinic_id UUID REFERENCES public.clinics(id) NOT NULL,
    service_type TEXT NOT NULL,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    status appointment_status DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sales table
CREATE TABLE public.sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES public.profiles(id) NOT NULL,
    clinic_id UUID REFERENCES public.clinics(id) NOT NULL,
    product_id UUID REFERENCES public.products(id),
    patient_id UUID REFERENCES public.profiles(id),
    sale_type sale_type NOT NULL,
    payment_method payment_method NOT NULL,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    commission_rate DECIMAL(5,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    qr_code TEXT,
    invoice_number TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(product_id, patient_id)
);

-- Enable Row Level Security
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clinics
CREATE POLICY "Clinics are viewable by everyone" ON public.clinics FOR SELECT USING (true);
CREATE POLICY "Only admins can modify clinics" ON public.clinics FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Sellers can view other profiles in their clinic" ON public.profiles FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.role IN ('seller', 'admin') AND p.clinic_id = clinic_id)
);

-- RLS Policies for products
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Only admins can modify products" ON public.products FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- RLS Policies for inventory
CREATE POLICY "Inventory is viewable by authenticated users" ON public.inventory FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only sellers and admins can modify inventory" ON public.inventory FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('seller', 'admin'))
);

-- RLS Policies for appointments
CREATE POLICY "Patients can view their own appointments" ON public.appointments FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = patient_id)
);
CREATE POLICY "Patients can create their own appointments" ON public.appointments FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = patient_id)
);
CREATE POLICY "Sellers can view appointments in their clinic" ON public.appointments FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('seller', 'admin') AND clinic_id = appointments.clinic_id)
);
CREATE POLICY "Sellers can modify appointments in their clinic" ON public.appointments FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('seller', 'admin') AND clinic_id = appointments.clinic_id)
);

-- RLS Policies for sales
CREATE POLICY "Sellers can view their own sales" ON public.sales FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = seller_id)
);
CREATE POLICY "Sellers can create sales" ON public.sales FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = seller_id AND role IN ('seller', 'admin'))
);
CREATE POLICY "Admins can view all sales" ON public.sales FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- RLS Policies for reviews
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Patients can create reviews" ON public.reviews FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = patient_id)
);
CREATE POLICY "Patients can update their own reviews" ON public.reviews FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = patient_id)
);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_clinics_updated_at BEFORE UPDATE ON public.clinics FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial data for clinics
INSERT INTO public.clinics (name, address, phone, email) VALUES
('Cluj-Napoca', 'Str. Memorandumului 28', '+40 XXX XXX XXX', 'cluj@aevum.ro'),
('Iași', 'Bd. Ștefan cel Mare 15', '+40 XXX XXX XXX', 'iasi@aevum.ro'),
('Galați', 'Str. Brăilei 101', '+40 XXX XXX XXX', 'galati@aevum.ro'),
('București', 'Calea Victoriei 120', '+40 XXX XXX XXX', 'bucuresti@aevum.ro');

-- Insert initial products data
INSERT INTO public.products (name, description, price, original_price, category, rating, review_count) VALUES
('Ser Vitamina C Premium', 'Ser concentrat cu vitamina C stabilizată pentru luminozitate și anti-aging', 189.00, 220.00, 'dermato-cosmetice', 4.8, 127),
('Cremă Regenerantă Nocturnă', 'Cremă avansată cu retinol și peptide pentru regenerare nocturnă', 245.00, NULL, 'dermato-cosmetice', 4.9, 89),
('Protecție Solară SPF 50+', 'Protecție UV avansată cu antioxidanți și acid hialuronic', 95.00, NULL, 'dermato-cosmetice', 4.7, 203),
('NAD+ Longevity Complex', 'Complex avansat NAD+ pentru longevitate și energie celulară', 320.00, NULL, 'suplimente', 4.9, 156),
('Omega-3 Premium', 'Omega-3 purificat cu EPA și DHA de înaltă concentrație', 145.00, NULL, 'suplimente', 4.6, 98),
('Probiotice Avansate', 'Complex probiotic cu 15 tulpini pentru sănătatea intestinală', 185.00, NULL, 'suplimente', 4.8, 234),
('Voucher Evaluare Longevitate', 'Voucher cadou pentru evaluare completă longevitate', 500.00, NULL, 'vouchere', 5.0, 45),
('Pachet Terapie IV Premium', 'Voucher pentru 3 ședințe de terapie IV personalizată', 1200.00, 1400.00, 'vouchere', 4.9, 67);

-- Insert initial inventory data
INSERT INTO public.inventory (product_id, clinic_id, stock_quantity)
SELECT p.id, c.id,
    CASE 
        WHEN p.name = 'Ser Vitamina C Premium' THEN 
            CASE WHEN c.name = 'Cluj-Napoca' THEN 12 WHEN c.name = 'Iași' THEN 8 WHEN c.name = 'Galați' THEN 5 ELSE 15 END
        WHEN p.name = 'Cremă Regenerantă Nocturnă' THEN 
            CASE WHEN c.name = 'Cluj-Napoca' THEN 7 WHEN c.name = 'Iași' THEN 12 WHEN c.name = 'Galați' THEN 9 ELSE 20 END
        WHEN p.name = 'Protecție Solară SPF 50+' THEN 
            CASE WHEN c.name = 'Cluj-Napoca' THEN 25 WHEN c.name = 'Iași' THEN 18 WHEN c.name = 'Galați' THEN 15 ELSE 30 END
        WHEN p.name = 'NAD+ Longevity Complex' THEN 
            CASE WHEN c.name = 'Cluj-Napoca' THEN 15 WHEN c.name = 'Iași' THEN 10 WHEN c.name = 'Galați' THEN 8 ELSE 25 END
        WHEN p.name = 'Omega-3 Premium' THEN 
            CASE WHEN c.name = 'Cluj-Napoca' THEN 20 WHEN c.name = 'Iași' THEN 15 WHEN c.name = 'Galați' THEN 12 ELSE 18 END
        WHEN p.name = 'Probiotice Avansate' THEN 
            CASE WHEN c.name = 'Cluj-Napoca' THEN 18 WHEN c.name = 'Iași' THEN 22 WHEN c.name = 'Galați' THEN 14 ELSE 28 END
        ELSE 999  -- Vouchere are unlimited
    END
FROM public.products p, public.clinics c;