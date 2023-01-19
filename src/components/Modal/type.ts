export interface IErrorModalProps {
    error: Error;
    setIsOpenErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ICheckModalProps {
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAgree: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
}
