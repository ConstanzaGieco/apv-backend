import mongoose from 'mongoose';

const pacientesSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    propietario:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    fecha:{
        type:Date,
        required:true,
        default: Date.now(),
    },
    sintomas:{
        type:String,
        required:true
    },
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Veterinario" //este nombre debe ser el mismo que se puso en el nombre del modelo al que se lo quiere relacionar (en este caso a veterinario)
    }
},{
    timestamps: true,
})

const Paciente = mongoose.model('Paciente', pacientesSchema);

export default Paciente