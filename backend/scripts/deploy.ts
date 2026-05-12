import hre from "hardhat";

async function main() {
  const verification = await hre.ethers.deployContract(
    "Verification"
  );

  await verification.waitForDeployment();

  console.log(
    "Contract deployed to:",
    await verification.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
