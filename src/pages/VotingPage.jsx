import React, { useState } from "react";
import { useEffect } from "react";
import PageContainer from "../components/PageContainer";
import VotingCandidateCard from "../components/VoteCandidateCard";
import customAxios from "../utils/CustomAxios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useIsLoading from "../hooks/useIsLoading";
import MainLoader from "../components/MainLoader";
import { ethers } from "ethers";
import ElectionAbi from "../utils/SmartContract/ElectionContract.json";
import { ElectionContractAddress } from "../utils/config";
import { useSnackbar } from "notistack";

const VotingPage = () => {
  const [state, setState] = useState([]);
  const { startLoading, endLoading, isLoading } = useIsLoading();
  const currentUser = useSelector(state => state.auth.currentUser)
  const navigate = useNavigate();
  const isVerfied = useSelector((state) => state.auth?.isVerified);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isVerfied) {
      navigate("/");
    }
  }, [isVerfied]);

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
          let myVote = await ElectionContract.getYourVote(currentUser?.user?.voter_id);
          if(myVote.isValue){
            navigate("/")          
            throw Error('You have already voted!!')
          } 
          const response = await customAxios.get("/voter/getAllCandidates");
          setState(response.data.data.candidates);
        }
      }catch(err){
        enqueueSnackbar(err.response?.data?.message ?? err.message, {
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
        <>
          <h1 className="text-2xl text-center">Voting Phase is Active!!</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-5 justify-center mt-5">
            {state.map((el) => (
              <VotingCandidateCard key={el._id} {...el} />
            ))}
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default VotingPage;
