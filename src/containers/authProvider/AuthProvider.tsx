import { Loader } from "@/components/ui/Loader";
import { auth } from "@/services/firebase";
import { selectorUserActions } from "@/store/user/selectors";
import { useUserStore } from "@/store/user/userStore";
import { Flex } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, type FC, type PropsWithChildren } from "react";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const { setUser } = useUserStore(selectorUserActions);
  const { clearUser } = useUserStore(selectorUserActions);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        clearUser();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [clearUser, setUser]);

  if (loading) {
    return (
      <Flex w="100vw" height="100vh" justify="center" align="center">
        <Loader />
      </Flex>
    );
  }

  return <>{children}</>;
};
