import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class  EventsBrokerService{
  private client: mqtt.MqttClient;

  constructor(private readonly config: ConfigService) {
    console.log("Se instancia");
    this.connectToBroker();
  }

  private connectToBroker() {
    this.client = mqtt.connect(this.config.get<string>('IP_BROKER') as string); // Reemplaza broker.example.com con la dirección de tu broker MQTT

    this.client.on('connect', () => {
      console.log('Conexión exitosa al broker MQTT  ');
    });

    this.client.on('error', (error) => {
      console.error('Error de conexión al broker MQTT:', error);
    });

    // this.client.on('message', (topic, message) => {
    //   console.log('Mensaje recibido:', topic, message.toString());
    // });
  }


  publishMessage(topic: string, message: string) {
    this.client.publish(topic, message);
  }

  subscribeToTopic(topic:any) {
    return this.client.subscribe(topic);
  }
}
