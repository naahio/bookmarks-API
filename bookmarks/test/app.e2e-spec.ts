
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module';
import { EditUserDto } from 'src/user/dto';

describe('Edi usere', () => {
  it('Shiuld edidt user', () => {
    const tdto: EditUserDto = {
      firstname: 'Naahio',
      email: 'mbabela.1337@gmail.com',
    };
    return pactum.spec()
      .patch('/users')
  })
});

