
export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
 }
export class User {
    uid: any;
    email: string;
    name: string;
    roles: Roles;

    constructor(email, password, name ) {
        this.email = email;
        this.name = name;
        this.roles = {subscriber: true};
    }

}
