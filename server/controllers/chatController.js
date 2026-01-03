import {chatADTO} from "../DTOs.js";

export class ChatController {
    constructor(chatRepo){
        this.chatRepo = chatRepo
    }

    async findAll(req, res) {
        let results = await this.chatRepo.findAll()

        results = results.map(c => chatADTO(c))

        res.status(200).json(results)
    }
}


