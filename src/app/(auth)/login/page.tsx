'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import FormModal from '../_components/Modal';

const LoginPage = () => {
  const router = useRouter();
  const form = useForm();

  const handleSubmit = () => {
    console.log('first');
  };

  const handleModal = () => {
    router.push('/');
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="h-[360px] w-[645px] border-0 base-regular mobile:w-[335px] tablet:w-[440px] tablet:small-regular ">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="이메일을 입력해 주세요."
                          // isError={true}
                          errorText="이메일 형식에 맞게 입력해주세요."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="pt-4">
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="비밀번호를 영문, 숫자, 특수문자가 포함된 8~16자로 입력해 주세요."
                          // isError={true}
                          errorText="8자 이상 입력해 주세요."
                          endAdornment={<EyeOff className="mr-2 h-[20px] text-neutral-200 " />}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormModal
                title="로그인"
                content="로그인이 완료되었어요!"
                handleModal={handleModal}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
