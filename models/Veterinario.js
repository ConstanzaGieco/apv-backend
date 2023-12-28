import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

//El trim elimina los espacios en blanco
const veterinarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    telefono:{
        type: String,
        default: null,
        trim: true,
    },
    web:{
        type: String,
        default: null,
    },
    token:{
        type: String,
        default: generarId(),
    },
    confirmado:{
        type: Boolean,
        default: false,
    }
});

veterinarioSchema.pre('save', async function(next) {
    //si un password ya está hasheado que pase al siguiente
    if(!this.isModified('password')){
        next();
    }
    //hashear el password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    //comparar el password del formulario con el hasheado
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Veterinario = mongoose.model('Veterinario', veterinarioSchema);
export default Veterinario;