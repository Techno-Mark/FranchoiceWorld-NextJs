import CloseIcon from "@/assets/icons/closeIcon";
import React, { useState, useEffect } from "react";
import { GetOtp, VerifyOtp } from "@/api/investor";
import { useRouter } from "next/navigation";
import OtpIcon from "@/assets/icons/otpicon";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  mobileNumber: string;
  countryCode: string;
  submitUrl: string;
}

const OTPModal: React.FC<OTPModalProps> = ({
  isOpen,
  onClose,
  mobileNumber,
  countryCode,
  submitUrl,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
  const [canResend, setCanResend] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attempts, setAttempts] = useState(2);
  const [verifyDone, setVerifyDone] = useState(false);
  const router = useRouter();

  const otpGet = async () => {
    const params = {
      countryCode: countryCode,
      phoneNumber: mobileNumber,
      pageFrom: submitUrl === "/list-your-brand/step_1" ? "brand" : "investor",
    };
    try {
      const response = await GetOtp(params);
      if (response.ResponseStatus === "success") {
        setCanResend(false);
        setTimer(60);
      } else {
        setVerificationError(true);
        setErrorMessage("Resend OTP is Failed. Please try again later.");
      }
    } catch (error) {
      console.log("Hello");
      console.error("Error getting OTP:", error);
      setErrorMessage("Resend OTP is Failed. Please try again later.");
    }
  };

  useEffect(() => {
    let countdown: NodeJS.Timeout | undefined;

    if (isOpen && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [isOpen, timer]);

  useEffect(() => {
    if (isOpen) {
      setVerifyDone(false);
      setCanResend(false);
      setTimer(60);
      setOtp(["", "", "", ""]);
      setVerificationError(false);
      setErrorMessage("");
      setAttempts(2); // Reset attempts when modal is opened
      otpGet();
    }
  }, [isOpen]);

  const maskPhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber.length < 4) return phoneNumber;
    const firstTwo = phoneNumber.slice(0, 2);
    const lastTwo = phoneNumber.slice(-2);
    const maskedPart = "*".repeat(phoneNumber.length - 4);
    return `${firstTwo}${maskedPart}${lastTwo}`;
  };

  const maskedNumber = maskPhoneNumber(mobileNumber);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== "") {
      const nextInput = element.form?.elements[index + 1] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to previous input
      const inputs = e.currentTarget.form?.elements;
      if (inputs) {
        (inputs[index - 1] as HTMLInputElement).focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (i >= 6) break;
      if (/^\d+$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);

    // Focus the next empty input or the last input if all are filled
    const inputs = e.currentTarget.form?.elements;
    if (inputs) {
      const nextEmptyIndex = newOtp.findIndex((val) => val === "");
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      (inputs[focusIndex] as HTMLInputElement)?.focus();
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);

    // setCanResend(false);
    setVerificationError(false);
    setErrorMessage("");
    setAttempts(2); // Reset attempts when OTP is resent
    otpGet();
    setVerifyDone(false);
    // Add your resend OTP logic here
  };

  const handleClose = () => {
    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", ""]);
    setVerificationError(false);
    setErrorMessage("");
    onClose();
    setVerifyDone(false);
  };

  const handleVerify = async () => {
    const otpString = otp.join(""); // Convert OTP array to string
    const params = {
      countryCode: countryCode,
      phoneNumber: mobileNumber,
      submittedOTP: otpString,
      pageFrom: submitUrl === "/list-your-brand/step_1" ? "brand" : "investor",
    };
    try {
      const response = await VerifyOtp(params);
      if (response.ResponseStatus === "success") {
        setVerificationError(false);
        setErrorMessage("");
        setVerifyDone(true);
        setAttempts(2);
        setTimeout(() => {
          router.push(submitUrl);
        }, 2000);
      }
      if (response.ResponseStatus === "failure") {
        setVerificationError(true);
        setErrorMessage(response.Message);
        setVerifyDone(false);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setVerificationError(true);
      setVerifyDone(false);
      setErrorMessage("Invalid OTP. Please try agian. ");
    }
  };
  const isOtpComplete = otp.every((digit) => digit !== "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      {!verifyDone ? (
        <div className="bg-white md:max-w-[450px] max-w-[300px] border rounded-lg">
          <div className="flex !justify-end pt-4 pr-8 md:pr-5">
            <button
              className="bg-transparent border-none text-2xl cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex justify-center items-center px-7 md:px-14 md:py-7 flex-col pb-6">
            <span className="text-[var(--footer-bg)] text-base md:text-3xl pr-[100px] md:pr-20 pb-2 font-bold">
              OTP Verification
            </span>
            <div className="text-left pb-7 md:pb-14  text-sm">
              Enter the verification code we just sent to your number{" "}
              {countryCode} {maskedNumber}.
            </div>
            <form
              className={`flex ${verificationError ? "" : "pb-5 md:pb-14"}`}
            >
              {otp.map((digit, index) => (
                <div key={index} className="md:px-3 px-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d{1}"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    onFocus={(e) => e.target.select()}
                    onPaste={handlePaste}
                    className={`block w-10 border text-center rounded-lg py-2 px-2 focus:outline-none text-base font-semibold ${
                      verificationError
                        ? "border-red-500"
                        : "border-[rgba(115,114,115,0.4)]"
                    }`}
                  />
                </div>
              ))}
            </form>
            {verificationError && (
              <div className="text-red-500 text-sm w-full text-left pt-2 pb-9 md:pl-20">
                {errorMessage}
              </div>
            )}
            <div className="flex">
              {canResend ? (
                <>
                  <div className="flex text-sm">Didn&apos;t receive code?</div>
                  <button
                    className="text-[var(--resend-color)] underline ml-1 font-semibold"
                    onClick={handleResend}
                  >
                    Resend
                  </button>
                </>
              ) : (
                <div>
                  Resend OTP in{" "}
                  {`${Math.floor(timer / 60)
                    .toString()
                    .padStart(2, "0")}:${(timer % 60)
                    .toString()
                    .padStart(2, "0")}`}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between w-full pb-5 px-20">
            <button
              className={`px-5 py-2.5 border-none rounded-lg w-full cursor-pointer text-white ${
                !isOtpComplete || attempts <= 0
                  ? " bg-[rgba(115,114,115,0.5)] pointer-events-none cursor-not-allowed"
                  : "bg-[rgba(210,31,52,1)] "
              }`}
              onClick={handleVerify}
              disabled={!isOtpComplete || attempts <= 0}
            >
              <span className="flex items-center font-semibold justify-center">
                Verify
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white md:w-2/5 w-auto border rounded-lg">
          {" "}
          <div className="flex !justify-end pt-4 pr-5">
            <button
              className="bg-transparent border-none text-2xl cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex justify-center items-center px-14  flex-col pb-6">
            <span className="text-[var(--footer-bg)] text-3xl  pb-14 font-bold">
              <OtpIcon />
            </span>
            <div className="text-center w-full font-bold text-[var(--footer-bg)] md:w-96 pb-4  text-3xl">
              OTP Verification Successful
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OTPModal;
