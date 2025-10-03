import { JsonUserModel, User} from "../models/user-model";


export class UserService{

    private repository= new JsonUserModel()

    async findUserByEmail (email:string){
        
        const result = await this.repository.getUserByEmail(email)

        console.log(result, "---service")

        return result
    }

    async registerUser(data: { name: string; email: string; password: string }) {
    
    if (!data.name || !data.email || !data.password) {
      throw new Error("Todos los campos son obligatorios.");
    }

    
    const existingUser = await this.repository.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error("El correo ya está registrado.");
    }

    const newUser: User = {
      id: 0,
      name: data.name,
      email: data.email,
      password: data.password,
    };

    
    const createdUser = await this.repository.addUser(newUser);

    console.log("Usuario registrado:", createdUser);

    return createdUser;
  }
}