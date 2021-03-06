import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";

import logoImg from "../../public/logo.svg";
import styles from "../../styles/Home.module.scss";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/input";
import { AuthContext } from "../contexts/AuthContext";
import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("password");

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.warning("Preencha os dados");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };
    await signIn(data);

    setLoading(false);
  }

  function activePassword() {
    if (active === "password") {
      setActive("text");
    } else {
      setActive("password");
    }
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={styles.inpuntPassword}>
              <Input
                placeholder="Digite sua senha"
                type={active}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiOutlineEye
                width={30}
                height={30}
                className={styles.icon}
                color="#FFF"
                // onClick={() => setActive("password")}
                onClick={activePassword}
              />
            </div>

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>
          <Link href="/signup">
            <a className={styles.text}>Não possui uma conta? cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
