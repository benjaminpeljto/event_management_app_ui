import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral?: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

export type EventType = 'CONCERT'| 'GIG' | 'SPORT' | 'FESTIVAL' | 'THEATER' | 'FOOD' | 'SEMINAR';

export type TicketType = 'REGULAR' | 'VIP';

export type PaymentType = "BANK_TRANSFER" | "PAYPAL" | "CREDIT_CARD";

type EventStatus = 'PENDING_APPROVAL' | 'COMPLETED' | 'CANCELLED' | 'SOLD_OUT' | 'SCHEDULED' | 'ONGOING';

type EventOrganizer = {
  id: string,
  name: string,
  email: string
}

export type SeatPerTicketType = {
  ticketType: TicketType,
  quantity: number,
  typePrice: number
}

export type EventDetails = {
  id: string,
  name: string,
  description: string,	
  location: string,
  eventCategory: EventType,
  organizer: EventOrganizer,
  occuranceDateTime: string,
  eventStatus: EventStatus,
  creationDate: string, // ISO 8601 format, e.g., "2021-12-31T23:59:59"
  seatsPerTicketType: SeatPerTicketType[],
  totalAvailableSeats: number,
  image: string
}


export type CategoryTypeForCategoryPage = 'music' | 'sport' | 'theater' | 'food' | 'seminar' | 'festival';


export type RegisterFormType = {
  firstName: string;
  lastName: string
  username: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginFormType = {
  email: string,
  password: string
}

type BoughtTicket = {
  id: string;
  eventId: string;
  ticketType: TicketType;
  price: number;
}

export type OrderReturnType = {
  id: string;
  buyerId: string;
  totalPrice: number;
  paymentType: PaymentType;
  boughtTickets: BoughtTicket[];
}

export type OrderPostType = {
  eventId: string;
  ticketTypes: {ticketType: TicketType, quantity: number}[];
}

type TicketEventEmbedded = {
  id: string;
  title: string;
  location: string;
}

export type TicketReturnType = {
  id: string;
  ticketType: TicketType;
  price: number;
  buyerId: string;
  event: TicketEventEmbedded;
  createdAt: string;
}

export type UserType = "GUEST" | "MEMBER" | "ORGANIZER" | "ADMIN";

type EventFormTicketTypes = {
  ticketType: TicketType;
  quantity: number;
  typePrice: number;
}

export type EventFormType = {
  name: string;
  description: string;
  location: string;
  eventCategory: EventType;
  organizerId: string;
  occuranceDateTime: string;
  eventStatus: EventStatus;
  ticketTypes: EventFormTicketTypes[];
  image: string;
}


export type DashBoardProps = {
  userType: UserType;
};