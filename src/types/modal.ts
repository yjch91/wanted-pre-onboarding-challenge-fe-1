export interface ErrorModalProps {
    error: Error;
    setIsOpenErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ITodoCheckModalProps {
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAgree: React.Dispatch<React.SetStateAction<boolean>>;
}
