export interface User {
  display_name: string
  email: string
  phone_number: string | null
  photo_url: string | null
  provider_id: string
  uid: string
  custom_claims: { [key: string]: boolean }

  [key: string]: string | { [key: string]: string | boolean } | null
}
