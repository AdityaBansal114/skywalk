import axios, { AxiosResponse } from 'axios';
import {headers} from 'next/headers';

// Cal.com API base URL
const CALCOM_API_BASE = 'https://api.cal.com/v1';

// Types for Cal.com API
export interface CalComEventType {
  id: number;
  title: string;
  slug: string;
  length: number;
  seatsShowAttendees: boolean;
}

export interface CalComAvailabilityOverride {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
  seatsPerDay?: number;
}

export interface CalComBooking {
  id: number;
  uid: string;
  startTime: string;
  endTime: string;
  status: string;
  attendees: Array<{
    name: string;
    email: string;
  }>;
  eventType: {
    id: number;
    title: string;
  };
}
interface CalComBookingsResponse {
  bookings: CalComBooking[];
  recurringInfo: any[];
  totalCount: number;
  nextCursor: string | null;
}

export interface CalComApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

// Cal.com API client class
class CalComClient {
  private apiKey: string;
  private eventTypeId: string;

  constructor() {
    this.apiKey = process.env.CALCOM_API_KEY!;
    this.eventTypeId = process.env.CALCOM_EVENT_TYPE_ID!;
    
    if (!this.apiKey) {
      throw new Error('CALCOM_API_KEY is required');
    }
    if (!this.eventTypeId) {
      throw new Error('CALCOM_EVENT_TYPE_ID is required');
    }
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  private getApiKeyParam() {
    return { apiKey: this.apiKey };
  }



  // Update event type daily capacity
  async updateDailyCapacity(capacity: number): Promise<CalComEventType>  {
    try {
      const response: AxiosResponse<CalComApiResponse<CalComEventType>> = await axios.patch(
        `${CALCOM_API_BASE}/event-types/${this.eventTypeId}`,
        { seatsPerTimeSlot: capacity },
        { 
          params: this.getApiKeyParam(),
          headers: this.getHeaders() 
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data.data;
    } catch (error: any) {
      console.error('Error updating daily capacity:', error);
      throw new Error(`Failed to update daily capacity: ${error.message}`);
    }
  }

  async cancelBooking(bookingId : string){
    try{
      const res = await axios.post(`https://api.cal.com/v2/bookings/${bookingId}/cancel`,
        {
          cancellationReason: "cancelled by server",
          cancelSubsequentBookings: false
        },
        {
          headers:{
            'cal-api-version' : "2024-08-13",
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      )


    }
    catch (e){
      console.log("error in cancelling bookin in calcom client" + e);
      // throw new Error(`error in cancelling booking  ${e}`)
    }
  }

  async generateBookingLink(): Promise<string> {
  try {
    const response: AxiosResponse<{ data: { bookingUrl: string } }> = await axios.post(
      `https://api.cal.com/v2/event-types/${this.eventTypeId}/private-links`,
      {
        maxUsageCount : 1
      },
      {headers:{
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          }}
    );

    return `${response.data.data.bookingUrl}/service`

  } catch (error: any) {
    console.error("Error generating booking link:", error.response?.data || error.message);
    throw new Error(`Failed to generate booking link: ${error.message}`);
  }
}


  // Get all bookings for the event type
  async getBookings(date?: string): Promise<CalComBooking[]> {
    try {
      const params: any = {
        eventTypeId: this.eventTypeId,
      };

      if (date) {
        params.dateFrom = date;
        params.dateTo = date;
      }

      const response: AxiosResponse<{ status: string; data: CalComBookingsResponse }> = await axios.get(
        `https://api.cal.com/v2/bookings`,
        {
          params: { ...params, afterStart : date},
          headers:{
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          }
        }
      );


      if (!response) {
        throw new Error(response);
      }

      return response.data.data.bookings || [];
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }
  }


}

// Export singleton instance
export const calComClient = new CalComClient();

// Helper function to format date for Cal.com API
export function formatDateForCalCom(date: string): string {
  return new Date(date).toISOString().split('T')[0];
}

// Helper function to check if date is valid
export function isValidDate(date: string): boolean {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}

