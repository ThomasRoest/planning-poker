import React, { FormEvent, useCallback, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuthContext } from "../../components/Auth/AuthProvider";
import { useHistory } from "react-router";

const Login = () => {
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [submitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const borderColor = useColorModeValue("gray.300", "gray.600");

  const { signIn } = useAuthContext();

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setIsSubmitting(true);
      try {
        await signIn(password);
        history.push("/create-session");
      } catch (error) {
        setIsSubmitting(false);
        setErrorMsg("incorrect password");
      }
    },
    [history, password, signIn]
  );

  return (
    <Box border="1px" borderColor={borderColor} padding="5" borderRadius="3">
      <Heading size="lg" mb={4}>
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <Input
            id="wachtwoord"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            type="password"
          />
        </FormControl>
        {errorMsg && <p>Incorrect password.</p>}
        <Button type="submit" colorScheme="teal" mt={4} isLoading={submitting}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Login;
