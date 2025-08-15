-- Insert sample restaurant data
INSERT INTO public.restaurants (id, name, slug, description, address, phone, email, cuisine_type, price_range, rating, is_active) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Bella Vista', 'bella-vista', 'An exquisite fine dining experience featuring contemporary Italian cuisine with a modern twist', '123 Elegant Street, Downtown', '+1 (555) 123-4567', 'reservations@bellavista.com', 'Italian Fine Dining', '$$$', 4.8, true);

-- Insert sample menu categories
INSERT INTO public.menu_categories (id, restaurant_id, name, description, display_order, is_active) VALUES 
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Appetizers', 'Light and flavorful starters to awaken your palate', 1, true),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Main Courses', 'Our signature dishes crafted with the finest ingredients', 2, true),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Desserts', 'Sweet endings to complete your dining experience', 3, true);

-- Insert sample menu items
INSERT INTO public.menu_items (restaurant_id, category_id, name, description, price, image_url, is_popular, is_available, allergens, dietary_tags, prep_time, display_order) VALUES 
-- Appetizers
('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'Burrata & Heirloom Tomatoes', 'Fresh burrata cheese with seasonal heirloom tomatoes, basil oil, and aged balsamic reduction', 18.00, '/src/assets/burrata-appetizer.jpg', true, true, ARRAY['dairy'], ARRAY['vegetarian'], 10, 1),
('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'Seafood Crudo', 'Daily selection of fresh fish with citrus, olive oil, and microgreens', 22.00, '/src/assets/signature-dish.jpg', false, true, ARRAY['fish'], ARRAY['gluten-free'], 15, 2),
('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'Truffle Arancini', 'Crispy risotto balls with truffle oil and parmesan', 16.00, null, false, true, ARRAY['dairy', 'gluten'], ARRAY['vegetarian'], 12, 3),

-- Main Courses
('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440002', 'Pan-Seared Duck Breast', 'Five-spice duck breast with cherry glaze, roasted vegetables, and quinoa pilaf', 38.00, '/src/assets/duck-breast.jpg', true, true, ARRAY[], ARRAY['gluten-free'], 25, 1),
('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440002', 'Beef Wellington', 'Classic beef wellington with mushroom duxelles, served with roasted root vegetables', 45.00, '/src/assets/beef-wellington.jpg', true, true, ARRAY['gluten'], ARRAY[], 30, 2),
('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440002', 'Seafood Linguine', 'Fresh linguine with clams, mussels, and shrimp in white wine sauce', 32.00, '/src/assets/seafood-pasta.jpg', false, true, ARRAY['gluten', 'shellfish'], ARRAY[], 20, 3),
('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440002', 'Osso Buco', 'Braised veal shank with saffron risotto and gremolata', 42.00, null, false, true, ARRAY['dairy'], ARRAY[], 35, 4),

-- Desserts
('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440003', 'Chocolate Lava Cake', 'Warm chocolate cake with molten center, vanilla gelato, and fresh berries', 14.00, '/src/assets/chocolate-lava-cake.jpg', true, true, ARRAY['dairy', 'eggs', 'gluten'], ARRAY['vegetarian'], 15, 1),
('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440003', 'Tiramisu', 'Traditional Italian tiramisu with espresso-soaked ladyfingers and mascarpone', 12.00, '/src/assets/tiramisu.jpg', false, true, ARRAY['dairy', 'eggs', 'gluten'], ARRAY['vegetarian'], 5, 2),
('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440003', 'Panna Cotta', 'Vanilla panna cotta with seasonal fruit compote', 11.00, null, false, true, ARRAY['dairy'], ARRAY['vegetarian', 'gluten-free'], 10, 3);