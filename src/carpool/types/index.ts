export type AccessStatus = 'pending' | 'approved' | 'rejected';

export interface CarpoolUser {
  id: string;
  full_name: string;
  email: string;
  role: 'intern' | 'new_grad';
  start_month: 'may' | 'july';
  start_date: string; // Keep for legacy/specific date
  address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  has_car: boolean;
  seats_available: number;
  phone_number: string;
  willing_to_detour: boolean;
  max_detour_minutes: number; // For both drivers and riders
  offer_letter_url?: string;
  preferred_arrival_time: string; // e.g., "09:00"
  notes?: string;
  access_status: AccessStatus;
  is_admin: boolean;
  created_at: any; // Firestore Timestamp
}

export interface Carpool {
  id: string;
  driver_id: string;
  member_ids: string[]; // Including driver
  pickup_order: string[]; // Array of user IDs in order
  accepted_ids: string[]; // IDs of users who have clicked "Accept"
  status: 'suggested' | 'active' | 'completed';
  estimated_duration: number; // in minutes
  estimated_distance: number; // in miles or km
  route_polyline: string;
  created_at: any;
}

export interface RideRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  type: 'pickup_request' | 'drive_offer';
  status: 'pending' | 'accepted' | 'rejected';
  created_at: any;
}
