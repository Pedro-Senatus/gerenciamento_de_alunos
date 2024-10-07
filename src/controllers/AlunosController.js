let alunos =[
   { id: 0,
    nome: "",
    primeiraNota: 0,
    segundaNota: 0,
    media: 0,
    situação: ""}
]
   

class AlunosController{

    static cadastrarAluno(req,res){
        
        const novoAluno = req.body

        if(novoAluno.primeiraNota > 0 && novoAluno.primeiraNota < 10 && novoAluno.segundaNota >0 && novoAluno.segundaNota< 10){
            alunos.push(novoAluno)

            res.json(alunos[alunos.length-1])
        }else{
            res.status(404).json({message: "Aluno precisa ter uma nota"})
        }
        
    }

    static listarAluno(req, res){

        const newAlunosArray = alunos.filter(a => a.id !== 0);

        if (newAlunosArray.length > 0) {
            res.json(newAlunosArray);
        } else {
            res.status(404).json({ message: "Nenhum aluno encontrado." });
        }
    }

    static deletarAluno(req, res){

        const id = parseInt(req.params.id)

        let alunosExiste = alunos.some(a => a.id === id)

        if(alunosExiste){
            alunos = alunos.filter(a => a.id !== id && a.id > 0) 
            res.json(alunos)
        }else{
            res.status(404).json({message: "Id não encontrado!"})
        }
       
    }

    static atualizarDadosAluno(req, res){

        const id = parseInt(req.params.id)
        const alunoAtualizado = req.body

        const index = alunos.findIndex(a => a.id === id)
    
        if(index !== -1){

            alunos[index] = alunoAtualizado
        

            if(alunos.nome !== undefined){

                alunos[index].nome = alunoAtualizado.nome
            }
            if(alunos.primeiraNota !== undefined){

                alunos[index].primeiraNota = alunoAtualizado.primeiraNota
            }
            if(alunos.segundaNota !== undefined){

                alunos[index].segundaNota = alunoAtualizado.segundaNota
            }

            res.json(alunos[index])
            
        }else{

            res.status(404).json({message: "Aluno não encontrado!"})
        }
    }

    static calcularMedia(req,res){

        const id = parseInt(req.params.id)

        const aluno = alunos.find(a => a.id === id);

        if(aluno){

            if(aluno.primeiraNota > 0 && aluno.primeiraNota < 10 && aluno.segundaNota >0 && aluno.segundaNota< 10){
                const media = (aluno.primeiraNota + aluno.segundaNota) /2
            
                aluno.media = media;
                aluno.situação = media >= 7 ? "Aprovado" : "Reprovado";

                res.json({
                    id: aluno.id,
                    nome: aluno.nome,
                    media: aluno.media,
                    situação: aluno.situação,
                });
            }else{

                res.status(404).json({message:"As notas não são validas"})
            }
        }else{

            res.status(404).json({message:"Aluno não existe!"})
        }
            
    }
}

export default AlunosController

