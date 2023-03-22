import Image from "next/image";
import { theme } from "themes";
import styled from "styled-components";
import Icon from "components/atoms/Icon";

const ImagePreviewContainer = styled.div`
  position: relative;
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

type ImagePreviewProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  onRemove?: () => void;
};

const ImagePreview = (props: ImagePreviewProps) => {
  const { src, alt, width, height, onRemove } = props;

  const ImageViewClose = () => {
    onRemove && onRemove();
  };

  return (
    <>
      {src && (
        <ImagePreviewContainer>
          <CloseButtonWrapper>
          <Icon
            iconType="Close"
            fontSize="28px"
            width="32px"
            height="32px"
            hbackgroundColor={theme.colors.hover}
            onClick={ImageViewClose}
          />
          </CloseButtonWrapper>
          <Image
            src={src}
            alt={alt}
            width={width || 500}
            height={height || 500}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              verticalAlign: "middle"
            }}
          />
        </ImagePreviewContainer>
      )}
    </>
  );
};

export default ImagePreview;
