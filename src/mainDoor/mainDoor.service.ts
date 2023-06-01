
import { Injectable } from '@nestjs/common';
import { BussisnessException } from '../exceptions/bussisness-exception.class';
import { EventsBrokerService } from 'src/eventsBroker/eventsBroker.service';
import { LightsInconsistency } from 'src/exceptions/lights-inconsistency';
import { DynamicKeyService } from 'src/dynamicKey/dynamicKey.service';
@Injectable()
export class MainDoorService {
  constructor(
    private eventsBroker: EventsBrokerService, 
    private dynamicKeyService: DynamicKeyService
  ) {
    const suscription = this.eventsBroker.subscribeToTopic([
      'keypads/mainDoor',
    ]);
    suscription.on('message', (topic, message) => {
        this.openMainDoor(message.toString())
    });
  }
  
  async compareDynamicKey(key: String): Promise<Boolean> {
        const dynamicKey = (await this.dynamicKeyService.getAll())[0].code;
        let isSame = false;
        if(dynamicKey.toString() == key){
            isSame = true;
        }
    return isSame;
  }

  async openMainDoor(message:string) {
    let isSame = await this.compareDynamicKey(message.toString());

    if(isSame) {
        this.eventsBroker.publishMessage("servo/mainDoor", "1");
        console.log("envió")
    }
  }

  lockMainDoor() {
    this.eventsBroker.publishMessage("servo/mainDoor", "0");
    return true;
  }
  
}