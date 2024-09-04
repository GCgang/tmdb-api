import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { modalState } from '../../atom';

import ModalDetails from './ModalDetails';
import ModalContents from './ModalContents';

export default function MovieModal() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const id = Number(queryParams.get('id'));

  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  useEffect(() => {
    setIsModalOpen(id ? true : false);
  }, [location]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  const closeModal = () => navigate(-1);

  return (
    <>
      {isModalOpen ? (
        <Overlay
          onClick={closeModal}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Modal layoutId={`${type}${id}`} onClick={(e) => e.stopPropagation()}>
            <ModalInfo>
              <CloseButton
                onClick={closeModal}
                whileHover={{ scale: 1.2 }}
                initial={{ scale: 1 }}
              >
                <MdClose />
              </CloseButton>
              <ModalDetails id={id} />
              <ModalContents id={id} />
            </ModalInfo>
          </Modal>
        </Overlay>
      ) : null}
    </>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100vh;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
`;

const Modal = styled(motion.div)`
  position: relative;
  width: 90%;
  max-height: 90vh;
  background-color: #141414;
  color: #fff;
  z-index: 999;
  overflow: auto;
  border-radius: 10px;
  max-width: 1400px;
`;

const ModalInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const CloseButton = styled(motion.button)`
  color: #ffffff;
  background-color: #181818;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
