import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
import Title from "components/atoms/Title";
import Text from "components/atoms/Text";

const RankingRoot = styled.div`
  margin: 20px auto;
  width: 80%;
  background-color: rgb(247, 249, 249);
  border-radius: 10px;
`;

const RankinTitle = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const RankingShopList = styled.ul`
  margin-left: 20px;
  margin-bottom: 20px;
`;

const RankingShop = styled.li`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0px 0px 0px 2.5em;
  &:before {
    position: absolute;
    left: 0px;
    width: 0px;
    height: 0px;
    content: "";
    top: -1.25em;
    border: 1em solid transparent;
    border-bottom: 1.5em solid currentColor;
  }
  &::after {
    position: absolute;
    left: 0px;
    width: 0px;
    height: 0px;
    content: "";
    top: 0.25em;
    border: 0.5em solid transparent;
    border-left: 1em solid currentColor;
    border-right: 1em solid currentColor;
  }
  &:nth-child(1) {
    color: #dbb400;
  }
  &:nth-child(2) {
    color: #9fa0a0;
  }
  &:nth-child(3) {
    color: #c47022;
  }
`;

const Ranking = () => {
  const ranking = useSelector((state: RootState) => state.posts.ranking);

  return (
    <RankingRoot>
      <RankinTitle>
        <Title fontSize="20px">投稿店舗ランキング</Title>
      </RankinTitle>
      <RankingShopList>
        {ranking.map((rank, idx) => {
          return (
            <RankingShop key={rank._id}>
              <Text flex="1.25" marginRight="10px">
                第{idx + 1}位
              </Text>
              <Text flex="5" marginRight="10px">
                {rank._id}
              </Text>
              <Text flex="1">{rank.count}件</Text>
            </RankingShop>
          );
        })}
      </RankingShopList>
    </RankingRoot>
  );
};

export default Ranking;
