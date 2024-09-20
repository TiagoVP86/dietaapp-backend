import { FastifyInstance, FastifyReply, FastifyRequest, FastifyPluginOptions } from 'fastify'
import { CreateNutritionController } from './controllers/CreateNutritionController'

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/teste', (request: FastifyRequest, reply: FastifyReply) => {
    let responseText =
      '```json\n{\n  "nome": "Tiago",\n  "sexo": "Masculino",\n  "idade": 38,\n  "altura": 1.74,\n  "peso": 78,\n  "objetivo": "Emagrecer",\n  "refeicoes": [\n    {\n      "horario": "08:00",\n      "nome": "Cafe da Manha",\n      "alimentos": [\n        "1 fatia de pao integral",\n        "1 ovo cozido",\n        "1 copo de leite desnatado",\n        "1 banana"\n      ]\n    },\n    {\n      "horario": "10:30",\n      "nome": "Lanche da Manha",\n        "alimentos": [\n          "1 iogurte grego desnatado com granola"\n        ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoco",\n      "alimentos": [\n        "150g de frango grelhado",\n        "100g de arroz integral",\n        "100g de brócolis cozido"\n      ]\n    },\n    {\n      "horario": "15:30",\n      "nome": "Lanche da Tarde",\n      "alimentos": [\n        "1 Maça"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de peixe assado",\n        "100g de batata doce cozida",\n        "100g de salada verde"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Proteína do soro do leite",\n    "Creatina",\n    "BCAA"\n  ]\n}\n```'

    try {
      //Extrair o JSON
      let jsonString = responseText
        .replace(/```\w*\n/g, '')
        .replace(/\n```/g, '')
        .trim()

      let jsonObject = JSON.parse(jsonString)

      return reply.send({ data: jsonObject })
    } catch (err) {
      console.log(err)
    }
    reply.send({ ok: true })
  })

  fastify.post('/create', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateNutritionController().handle(request, reply)
  })
}
