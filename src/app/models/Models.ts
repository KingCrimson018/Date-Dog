////-----Tables-----////

export interface User{
    uid?: string
    firstName: string
    lastName: string
    dogsCant: number
    email: string
    photoId?: string
    imgProfileUrl?: string
    street: string,
    city : string,
    state? : string,
    country : string,
    zipcode? : string
    dogsFollowedCant: number
    whatsapp?: string
    lastDateUpdated? : any
    followersCant : number
    followedsCant : number
    instagram?: string
    facebook?: string
    premium: boolean
    active: boolean
    fcmToken?: string

}

export interface Dog{
    id: string
    name: string
    breed: string
    dob: any
    followersCant: number
    sex: string
    size?: number
    vaccinationUrl?: string[]
    ownerId: string
    ownerName: string
    ownerPhotoUrl?: string
    veterinary?: Veterinary
    profilePhotoUrl?: string
    photosUrl?: string[]
    medicalHistoryPhoto?: string
    ownerFcmToken?: string
    aboutMe?: string
    heat?: Heat
    active: boolean
}

export interface FollowDog {
    id: string
    followerId: string
    followerInfo: FollowerInfo
    dogId: string
    dogInfo: DogFollowedInfo
    date: any
}


export interface DogFollowedInfo{
    dogId: string
    dogName: string
    dogBreed: string
    dogImgUrl: string
    dogDob: any
    dogSex: string
    ownerFcmToken?: string

}
export interface Post{
    id?: string
    userId: string
    userName: string
    userLastName: string
    userImgUrl?: string
    description: string
    imgUrl?: string
    likes?: Like[]
    date: any
    category?: string
}

export interface Breed{
    name: string
    origin: string
    size: number
    temperament: string
    activityLevel: string
    hair: string
    health: string
    needs: string[]
}

export interface Veterinary{
    id: string
    name: string
    address: Address
    hourOpen: number
    hourClose: number
}

////------Bases-----////
export interface Address{
    street: string
    city: string
    state?: string
    country: string
    zipCode?: string
}

export interface Heat{
    startDate: any
    endDate: any
}

export interface Like{
    userId: string
    userName: string
    userLastName: string
    userPhotoUrl: string
    date?: any
}
export interface Follower{
    userId: string
    userFirstName: string
    userlastName: string
    userImgUrl: string
}
export interface Followed{
    userId: string
    userFirstName: string
    userlastName: string
    userImgUrl: string
}
export interface Follow{
    followId: string
    followerId: string
    followerInfo: FollowerInfo
    followedId: string 
    followedInfo: FollowedInfo
    date: any
}

export interface FollowerInfo{
    followerId: string
    followerFirstName: string
    followerLastName: string
    followerImgUrl: string
    followerFcmToken?: string

}
export interface FollowedInfo{
    followedId: string
    followedFirstName: string
    followedLastName: string
    followedImgUrl: string
    followedFcmToken?: string

}

export interface DogFollowerInfo{
    followerId: string
    followerFirstName: string
    followerLastName: string
    followerImgUrl: string
    date: Date
}


