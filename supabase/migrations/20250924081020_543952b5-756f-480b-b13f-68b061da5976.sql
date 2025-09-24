-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('medical-images', 'medical-images', true);

-- Create doctors/staff table
CREATE TABLE public.doctors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  specialization text NOT NULL,
  bio text,
  image_url text,
  email text,
  phone text,
  experience_years integer DEFAULT 0,
  education text,
  certifications text[],
  clinic_id uuid,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on doctors table
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- Create policies for doctors
CREATE POLICY "Doctors are viewable by everyone" 
ON public.doctors 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can modify doctors" 
ON public.doctors 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'::user_role
));

-- Create storage policies for medical images
CREATE POLICY "Medical images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'medical-images');

CREATE POLICY "Authenticated users can upload medical images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'medical-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Only admins can update medical images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'medical-images' 
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'::user_role
  )
);

CREATE POLICY "Only admins can delete medical images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'medical-images' 
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'::user_role
  )
);

-- Create trigger for doctors updated_at
CREATE TRIGGER update_doctors_updated_at
BEFORE UPDATE ON public.doctors
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Add sample doctors data
INSERT INTO public.doctors (name, specialization, bio, email, phone, experience_years, education) VALUES
('Dr. Maria Popescu', 'Dermatologie Estetică', 'Specialist în dermatologie estetică cu peste 15 ani experiență în tratamente laser și injectabile premium.', 'maria.popescu@aevum.ro', '+40721123456', 15, 'Universitatea de Medicină București, Fellowship Dermatologie Estetică Paris'),
('Dr. Alexandru Ionescu', 'Medicina Longevității', 'Expert în medicina anti-aging și terapii personalizate bazate pe profilul genetic individual.', 'alexandru.ionescu@aevum.ro', '+40721123457', 12, 'Universitatea de Medicină Cluj, Specializare Medicina Longevității SUA'),
('Dr. Andreea Marinescu', 'Neuromodulare', 'Specialist în neuromodulare EEG/VR și optimizarea funcțiilor cognitive prin tehnologii avansate.', 'andreea.marinescu@aevum.ro', '+40721123458', 8, 'Universitatea de Medicină Iași, Master Neuroscience Technology Berlin');