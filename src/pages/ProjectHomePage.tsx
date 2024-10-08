import Projects from '../components/organisms/Projects'
import DashboardLayout from '../components/templates/DashboardLayout'
import { AddButton } from '../components/atoms/AddButton'
import { useState } from 'react'
import { OneInputModal } from '../components/organisms/OneInputModal'
import styled from 'styled-components'
import { addProject } from '../service/apiClient'

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
export const Pad40 = styled.div`
  padding-right: 40px;
`

/**
 * ProjectHomePage 컴포넌트
 * 프로젝트 홈 페이지를 렌더링하며 프로젝트 목록과 프로젝트 추가 버튼을 포함
 */
export const ProjectHomePage = () => {
  const ownerId = 'xKjePzOPc1YWsUmgBMui' // 프로젝트 소유자의 ID
  const [isShowModal, setIsShowModal] = useState<boolean>(false) // 모달 표시 여부를 관리하는 상태

  /**
   * 프로젝트 추가 모달에서 입력된 값을 처리하는 함수
   * @param value - 모달에서 입력된 프로젝트 제목
   */
  const handleAddProject = async (value: string) => {
    const docRef = await addProject(ownerId, value)
    if (docRef) {
      alert('You have successfully added the project.')
      location.reload() // 페이지를 새로고침하여 추가된 프로젝트를 반영
    } else {
      alert('Failed to add the project.')
    }
  }

  /**
   * 프로젝트 추가 버튼 클릭 시 모달을 표시하는 함수
   */
  const handleOpenModal = () => {
    setIsShowModal(true)
  }

  /**
   * 모달을 닫는 함수
   */
  const handleCloseModal = () => {
    setIsShowModal(false)
  }

  return (
    <DashboardLayout>
      {/* 프로젝트 목록을 표시 */}
      <Projects ownerID={ownerId} />
      <ButtonContainer>
        {/* 프로젝트 추가 버튼 */}
        <AddButton
          color="gray"
          text="Add Project"
          onClick={handleOpenModal} // 모달 열기 함수 호출
        />
        <Pad40 />
      </ButtonContainer>
      {isShowModal && (
        /* 프로젝트 추가 모달 */
        <OneInputModal
          sendInputValue={handleAddProject} // 모달에서 입력된 값을 처리하는 함수 전달
          label="Enter a title for the project you want to create."
          buttonText="Add Project"
          isShowModal={isShowModal}
          setIsShowModal={handleCloseModal} // 모달 닫기 함수 전달
          placeholder="project title"
        />
      )}
    </DashboardLayout>
  )
}
