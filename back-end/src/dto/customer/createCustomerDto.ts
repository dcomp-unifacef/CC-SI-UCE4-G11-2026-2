export interface CreateCustomerDto {
 name: string;
 ident_document: string;
 phone: string;
 email: string;
 street_name: string;
 house_number: string;
 complements?: string | null;
 district: string;
 municipality: string;
 state: string;
}
