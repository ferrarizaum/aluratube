import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return{
        values,
        handleChange: (evento) =>{
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]:value,
            });
        },
        clearForm(){
            setValues({});
        }
    };
}

const PROJECT_URL = "https://ukslhidycmfpmywlwwha.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc2xoaWR5Y21mcG15d2x3d2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NzE1MDQsImV4cCI6MTk4NDA0NzUwNH0.BOTkJfG3feu7VQdSjaQ7n_oJa9fddNXGCyERVSU9Eww";

const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

//pegar thumb pela url do video
function getThumbnail(url){
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo: "", url: ""}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
                        })
                        .then((oqueveio) => {
                            console.log(oqueveio);
                        })
                        .catch((erro) => {
                            console.log(erro);
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input
                                placeholder="Titulo do vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange} 
                            />
                            <input
                                placeholder="URL do vídeo"
                                name="url"
                                value={formCadastro.values.url} 
                                onChange={formCadastro.handleChange} 
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false}

        </StyledRegisterVideo>
    )
}