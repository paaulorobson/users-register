import { withMask } from "use-mask-input";
import { PasswordField } from "./PasswordField";
import { useState } from "react";

const inputClassName =
  "mt-1 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400";
const disabledInputClassName =
  "mt-1 w-full cursor-not-allowed rounded-md border border-zinc-200 bg-zinc-100 px-3 py-2 text-sm text-zinc-500 outline-none";

export function Form() {
  const [address, setAddress] = useState({
    city: "",
    state: "",
    street: "",
    uf: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      setAddress({
        city: data.city,
        state: data.state,
        street: data.street,
        uf: data.state,
      });
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName" className="text-sm font-medium text-zinc-700">
          Nome Completo
        </label>
        <input id="fullName" type="text" className={inputClassName} />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          E-mail
        </label>
        <input id="email" type="email" className={inputClassName} />
      </div>

      <PasswordField id="password" label="Senha" />

      <PasswordField id="confirmPassword" label="Confirmar senha" />

      <div>
        <label htmlFor="phone" className="text-sm font-medium text-zinc-700">
          Telefone celular
        </label>
        <input
          id="phone"
          type="tel"
          className={inputClassName}
          ref={withMask("(99) 99999-9999")}
        />
      </div>

      <div>
        <label htmlFor="cpf" className="text-sm font-medium text-zinc-700">
          CPF
        </label>
        <input
          id="cpf"
          type="text"
          className={inputClassName}
          ref={withMask("999.999.999-99")}
        />
      </div>

      <div>
        <label htmlFor="cep" className="text-sm font-medium text-zinc-700">
          CEP
        </label>
        <input
          id="cep"
          type="text"
          className={inputClassName}
          ref={withMask("99999-999")}
          onBlur={handleZipcodeBlur}
        />
      </div>

      <div>
        <label htmlFor="address" className="text-sm font-medium text-zinc-700">
          Endereço
        </label>
        <input
          id="address"
          type="text"
          disabled
          className={disabledInputClassName}
          value={address.street}
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
            disabled
            className={disabledInputClassName}
            value={address.city}
          />
        </div>
        <div>
          <label htmlFor="uf" className="text-sm font-medium text-zinc-700">
            UF
          </label>
          <input
            id="uf"
            type="text"
            disabled
            className={disabledInputClassName}
            value={address.uf}
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
        />
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
