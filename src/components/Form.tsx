import { withMask } from "use-mask-input";
import { PasswordField } from "./PasswordField";
import { useForm, type FieldValues } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema, type UserRegisterSchema } from "../schema";

const inputClassName =
  "mt-1 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400";
const disabledInputClassName =
  "mt-1 w-full cursor-not-allowed rounded-md border border-zinc-200 bg-zinc-100 px-3 py-2 text-sm text-zinc-500 outline-none";

export function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserRegisterSchema>({
    resolver: zodResolver(userRegisterSchema),
  });
  const phoneRegistration = register("phone");
  const cpfRegistration = register("cpf");
  const cepRegistration = register("cep");

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    reset();

    // Handle form submission logic here
  };

  const handleZipcodeBlur = async (
    event: React.FocusEvent<HTMLInputElement>,
  ) => {
    const zipcode = event.target.value;

    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v2/${zipcode}`,
    );
    if (response.ok) {
      const data = await response.json();

      setValue("address", data.street);
      setValue("city", data.city);
      setValue("uf", data.state);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="fullName" className="text-sm font-medium text-zinc-700">
          Nome Completo
        </label>
        <input
          id="fullName"
          type="text"
          className={inputClassName}
          {...register("fullName")}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="fullName" />
        </p>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          className={inputClassName}
          {...register("email")}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="email" />
        </p>
      </div>
      <div>
        <PasswordField id="password" label="Senha" {...register("password")} />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="password" />
        </p>
      </div>
      <div>
        <PasswordField
          id="confirmPassword"
          label="Confirmar senha"
          {...register("confirmPassword")}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="confirmPassword" />
        </p>
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium text-zinc-700">
          Telefone celular
        </label>
        <input
          id="phone"
          type="tel"
          className={inputClassName}
          {...phoneRegistration}
          ref={(element) => {
            phoneRegistration.ref(element);
            withMask("(99) 99999-9999")(element);
          }}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="phone" />
        </p>
      </div>

      <div>
        <label htmlFor="cpf" className="text-sm font-medium text-zinc-700">
          CPF
        </label>
        <input
          id="cpf"
          type="text"
          className={inputClassName}
          {...cpfRegistration}
          ref={(element) => {
            cpfRegistration.ref(element);
            withMask("999.999.999-99")(element);
          }}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="cpf" />
        </p>
      </div>

      <div>
        <label htmlFor="cep" className="text-sm font-medium text-zinc-700">
          CEP
        </label>
        <input
          id="cep"
          type="text"
          className={inputClassName}
          {...cepRegistration}
          onBlur={(event) => {
            cepRegistration.onBlur(event);
            handleZipcodeBlur(event);
          }}
          ref={(element) => {
            cepRegistration.ref(element);
            withMask("99999-999")(element);
          }}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="cep" />
        </p>
      </div>

      <div>
        <label htmlFor="address" className="text-sm font-medium text-zinc-700">
          Endereço
        </label>
        <input
          id="address"
          type="text"
          readOnly
          className={disabledInputClassName}
          {...register("address")}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label htmlFor="city" className="text-sm font-medium text-zinc-700">
            Cidade
          </label>
          <input
            id="city"
            type="text"
            readOnly
            className={disabledInputClassName}
            {...register("city")}
          />
        </div>
        <div>
          <label htmlFor="uf" className="text-sm font-medium text-zinc-700">
            UF
          </label>
          <input
            id="uf"
            type="text"
            readOnly
            className={disabledInputClassName}
            {...register("uf")}
          />
        </div>
      </div>

      <label
        htmlFor="terms"
        className="flex items-center gap-2 text-sm text-zinc-700"
      >
        <input
          id="terms"
          type="checkbox"
          className="size-4 rounded border-zinc-300"
          {...register("terms")}
        />{" "}
        Aceito os termos e condições
      </label>

      <button
        type="submit"
        className="mt-2 w-full rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white cursor-pointer"
      >
        Cadastrar
      </button>
    </form>
  );
}
