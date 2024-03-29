import React from 'react';
import { Collapse } from 'antd';
import { css, StyleSheet } from 'aphrodite'
import ChartTable from '../Table/ChartTable'
const { Panel } = Collapse;

const styles = StyleSheet.create({
    CollapseContainer: {
        maxWidth: '80%',
        marginInline: 'auto'
    }
})

const ChartUpdate: React.FC<{items: any, lastId: any}> = ({items, lastId}) => {
  
  const dataToUdapte = Object.values(items)

  return  (
            <Collapse className={css(styles.CollapseContainer)}>
              {dataToUdapte.map(({id, title, ...ChartData}: any)=> {
                return (
                  <Panel header={title} key={id}>
                    <ChartTable ChartData={ChartData} lastId={lastId}/>
                  </Panel>
                )
              })}
            </Collapse>
          );
}

export default ChartUpdate;