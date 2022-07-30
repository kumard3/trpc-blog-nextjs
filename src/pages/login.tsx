import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

export default function Login() {
  const { handleSubmit, register } = useForm<CreateUserInput>();

  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/");
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p>{error.message}</p>}

        <input type="email" {...register("email")} />

        <br />

        <input type="text" {...register("name")} />

        <button type="submit">submit</button>
      </form>

      <Link href="/register">register</Link>
    </>
  );
}
