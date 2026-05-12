import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VerificationModule = buildModule("VerificationModule", (m) => {
  const verification = m.contract("Verification");

  return {
    verification,
  };
});

export default VerificationModule;
