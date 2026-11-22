export interface UpdateCustomerDto {
 name?: string;
 ident_document?: string;
 phone?: String;
 email?: string;
 street_name?: string;
 house_number?: string;
 complements?: string | null;
 district?: string;
 municipality?: string;
 state?: string;
}