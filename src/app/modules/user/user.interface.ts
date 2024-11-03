
export interface UserInfoI {
  name?: string;
  phone_number?: string;
  blood_group?: string;
  date_of_birth?: Date;
  gender?: string;
  height?: string;
  weight?: string;
  image_url?: string;
}

export interface UserImage {
  image_url?: string | undefined;
}

export interface ProfileSetupI extends UserImage {
  data: UserInfoI;
}


