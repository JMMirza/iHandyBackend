import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRepository } from './repositories/chat.respository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRepository])],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
