import {AppOperation} from '../..';
import {
  ForgotPasswordProps,
  LoginProps,
  RegistrationProps,
  SendOtpRegistrationProps,
} from '../../../helper/types';
import {GUEST_TYPE} from '../../types';

export default (appOperation: AppOperation) => ({
  send_otp: (data: SendOtpRegistrationProps) =>
    appOperation.post('user/send-otp', data, GUEST_TYPE),
  register: (data: RegistrationProps) =>
    appOperation.post('user/register', data, GUEST_TYPE),
  login: (data: LoginProps) =>
    appOperation.post('user/login', data, GUEST_TYPE),
  forgot: (data: ForgotPasswordProps) =>
    appOperation.post('user/forgot_password', data, GUEST_TYPE),
  verify_otp: (data: any) =>
    appOperation.post('user/verify-otp', data, GUEST_TYPE),
    
});
