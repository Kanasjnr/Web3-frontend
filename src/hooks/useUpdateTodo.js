import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { baseSepolia } from "@reown/appkit/networks";

const useUpdateTodo = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (index,title, description) => {
      if (!title || !description) {
        toast.error("All fields are required");
        return;
      }

      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        toast.error("Contract not found");
        return;
      }

      if (Number(chainId) !== Number(baseSepolia.id)) {
        toast.error("You're not connected to baseSepolia");
        return;
      }

      try {
        const estimatedGas = await contract.updateTodo.estimateGas(
          index,
          title,
          description
        );

        const tx = await contract.updateTodo(index, title, description, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });

        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Todo updated successfully");
          return;
        }

        toast.error("Failed to update todo");
        return;
      } catch (error) {
        console.error("Error from updating todo", error);
        toast.error("Failed to update todo");
      }
    },
    [contract, address, chainId]
  );
};
export default useUpdateTodo;