-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  custom_answers JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create policy for public inserts (anyone can book)
CREATE POLICY "Anyone can create appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (true);

-- Create policy for public reads (for now, anyone can view - you can restrict later with admin auth)
CREATE POLICY "Anyone can view appointments" 
ON public.appointments 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create custom form fields table
CREATE TABLE public.booking_form_fields (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  field_label TEXT NOT NULL,
  field_type TEXT NOT NULL DEFAULT 'text',
  is_required BOOLEAN NOT NULL DEFAULT false,
  field_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.booking_form_fields ENABLE ROW LEVEL SECURITY;

-- Anyone can read form fields
CREATE POLICY "Anyone can view form fields" 
ON public.booking_form_fields 
FOR SELECT 
USING (true);

-- Create available time slots table
CREATE TABLE public.available_time_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.available_time_slots ENABLE ROW LEVEL SECURITY;

-- Anyone can read time slots
CREATE POLICY "Anyone can view time slots" 
ON public.available_time_slots 
FOR SELECT 
USING (true);

-- Insert default time slots (Monday to Friday, 9am to 5pm, hourly)
INSERT INTO public.available_time_slots (day_of_week, start_time, end_time) VALUES
  (1, '09:00', '10:00'),
  (1, '10:00', '11:00'),
  (1, '11:00', '12:00'),
  (1, '14:00', '15:00'),
  (1, '15:00', '16:00'),
  (1, '16:00', '17:00'),
  (2, '09:00', '10:00'),
  (2, '10:00', '11:00'),
  (2, '11:00', '12:00'),
  (2, '14:00', '15:00'),
  (2, '15:00', '16:00'),
  (2, '16:00', '17:00'),
  (3, '09:00', '10:00'),
  (3, '10:00', '11:00'),
  (3, '11:00', '12:00'),
  (3, '14:00', '15:00'),
  (3, '15:00', '16:00'),
  (3, '16:00', '17:00'),
  (4, '09:00', '10:00'),
  (4, '10:00', '11:00'),
  (4, '11:00', '12:00'),
  (4, '14:00', '15:00'),
  (4, '15:00', '16:00'),
  (4, '16:00', '17:00'),
  (5, '09:00', '10:00'),
  (5, '10:00', '11:00'),
  (5, '11:00', '12:00'),
  (5, '14:00', '15:00'),
  (5, '15:00', '16:00'),
  (5, '16:00', '17:00');