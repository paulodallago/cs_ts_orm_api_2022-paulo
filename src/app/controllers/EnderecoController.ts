import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Jogador from '../models/Jogador';
import Endereco from '../models/Endereco';

class EnderecoController {

    async list(req: Request, res: Response){

        const repository = getRepository(Endereco);//recupera o repositorio de Endereço.

        const lista = await repository.find();//executa o comando de selecao para recuperar todos os enderecos.

        return res.json(lista);//retorna a lista
    }

    async store(req: Request, res: Response){

        const repository = getRepository(Endereco);//recupera o repositorio de Endereço
        console.log(req.body);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }

    //codigo fonte referente a parate 11.
    async delete(req: Request, res: Response){
        try{
            const repository = getRepository(Endereco);
            const {id} = req.body;
            const end = await repository.findOne({where : {"id" : id }});
            if(end){
                await repository.remove(end);
                return res.sendStatus(204);
            }else{
                return res.sendStatus(404);
            }
        }catch(e:unknown){
        
            console.log(e);
            return res.sendStatus(500);
        }

    }

    async find(req: Request, res: Response){
        const repository = getRepository(Endereco);
        const {cep} = req.body;
        const end = await repository.findOne({where : {cep}});
        if(end){
         return res.json(end);
        }else{
            return res.sendStatus(404);
        }
    }

    async update(req: Request, res: Response){

        const repository = getRepository(Endereco);//recupera o repositorio do jogador.
    
        const {id} = req.body;//extrai os atributos nickname e endereco do corpo da mensagem.
    
        const enderecoExists = await repository.findOne({where:{"id": id}})//!!!
        
        if(!enderecoExists){
            return res.sendStatus(404);
        }
        
        const e = repository.create(req.body); //cria a entidade Jogador
        
        await repository.save(e); //persiste (update) a entidade na tabela.
        
        return res.json(e);
    }
}

export default new EnderecoController();