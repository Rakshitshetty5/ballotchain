import React, { useState } from "react";
import SearchPVN from "../components/SearchPVN";
import PieChart from "../components/PieChart";
import PageContainer from "../components/PageContainer";
import { ethers } from "ethers";
import ElectionAbi from "../utils/SmartContract/ElectionContract.json";
import { ElectionContractAddress } from "../utils/config";
import { useEffect } from "react";
import customAxios from "../utils/CustomAxios";
import { useSnackbar } from "notistack";
import useIsLoading from "../hooks/useIsLoading";
import MainLoader from "../components/MainLoader";

const ResultsPage = () => {
  const [results, setResults] = useState({});
  const [candidates, setCandidates] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { startLoading, endLoading, isLoading } = useIsLoading();

  useEffect(() => {
    (async () => {
      startLoading();
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const ElectionContract = new ethers.Contract(
            ElectionContractAddress,
            ElectionAbi.abi,
            signer
          );
          let allVotes = await ElectionContract.getAllVotes();
          const resultObj = {};
          allVotes.forEach((el) => {
            if (resultObj[el]) {
              resultObj[el] += 1;
              return;
            }
            resultObj[el] = 1;
          });
          const response = await customAxios.get("/voter/getAllCandidates");
          setCandidates(response.data.data.candidates ?? []);
          setResults(resultObj);
        } else {
          enqueueSnackbar("Ethereum object doesn't exist", {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar(error.response?.data?.message ?? "Metamask error", {
          variant: "error",
        });
      }
      endLoading();
    })();
  }, []);

  return (
    <PageContainer>
      {isLoading ? (
        <MainLoader />
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-10">
          <SearchPVN candidates={candidates} />
          {candidates.length > 0 && (
            <PieChart results={results} candidates={candidates} />
          )}
        </div>
      )}
    </PageContainer>
  );
};

export default ResultsPage;
