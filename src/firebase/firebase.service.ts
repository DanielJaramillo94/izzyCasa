import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class FirebaseService {
  constructor(private readonly configService: ConfigService) {
    const adminConfig: ServiceAccount = {
      projectId: this.configService.get<string>('PROJECT_ID'),
      privateKey: this.configService.get<string>('PRIVATE_KEY'),
      clientEmail: this.configService.get<string>('CLIENT_EMAIL'),
    };
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
      storageBucket: this.configService.get<string>('STORAGE_BUCKET'),
    });
  }

  async verifyFirebaseToken(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      console.error('Error verifying Firebase token:', error);
      return null;
    }
  }

  async validateToken(token: string): Promise<boolean> {
    const isLegitToken = await this.verifyFirebaseToken(token);
    return !!isLegitToken;
  }

  async getDecodedToken(token: string): Promise<DecodedIdToken | null> {
    return this.verifyFirebaseToken(token);
  }
}
