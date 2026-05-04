const email = document.getElementById("email") as HTMLInputElement;
email.addEventListener("input", () => isValidEmail(email.value));

function isValidEmail(input: string) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  regex.test(input);
}
