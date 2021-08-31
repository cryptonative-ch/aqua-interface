/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as d3 from 'd3'
import React, { useRef, useEffect } from 'react'
import { Sale } from 'src/interfaces/Sale'

// Interfaces
import { GetAllBidsBySaleId_fairSale_bids } from 'src/subgraph/__generated__/GetAllBidsBySaleId'
import { formatBigInt } from 'src/utils'

interface BarChartComponentProps {
  width: number
  height: number
  data: GetAllBidsBySaleId_fairSale_bids[]
  userAddress: string
  vsp: number
  sale: Sale
}

export const BarChart: React.FC<BarChartComponentProps> = ({ width, height, data, userAddress, vsp, sale }) => {
  const ref = useRef<SVGSVGElement>(null)
  const shortenedCutoff = 50

  const getBidPricePerShare = (bid: GetAllBidsBySaleId_fairSale_bids) =>
    formatBigInt(bid.tokenInAmount, sale.tokenIn.decimals) / formatBigInt(bid.tokenOutAmount, sale.tokenOut.decimals)

  const getBidPriceText = (bid: GetAllBidsBySaleId_fairSale_bids, smallVersion: boolean) => {
    return `${(
      formatBigInt(bid.tokenInAmount, sale.tokenIn.decimals) / formatBigInt(bid.tokenOutAmount, sale.tokenOut.decimals)
    ).toFixed(2)}${!smallVersion ? `${sale.tokenIn.symbol}/${sale.tokenOut.symbol}` : ''}`
  }

  const getBidAmountText = (bid: GetAllBidsBySaleId_fairSale_bids, smallVersion: boolean) => {
    return `${formatBigInt(bid.tokenOutAmount, sale.tokenOut.decimals).toFixed(0)}${
      !smallVersion ? sale.tokenOut.symbol : ''
    }`
  }

  const draw = () => {
    if (width <= 232) {
      return
    }
    const svg = d3.select(ref.current)
    const sortedData = data.sort(
      (first, second) =>
        formatBigInt(second.tokenInAmount, sale.tokenIn.decimals) -
        formatBigInt(first.tokenInAmount, sale.tokenIn.decimals)
    )
    const activeBids = sortedData.filter(item => getBidPricePerShare(item) >= vsp)
    const inactiveBids = sortedData.filter(item => getBidPricePerShare(item) < vsp)
    const activeChartData: any[] = activeBids.map(item => formatBigInt(item.tokenOutAmount, sale.tokenOut.decimals))
    const inactiveChartData: any[] = inactiveBids.map(item => formatBigInt(item.tokenOutAmount, sale.tokenOut.decimals))

    svg.selectAll('g').remove()
    const activeSelection = svg.append('g').attr('class', 'activeSelection').selectAll('rect').data(activeChartData)

    const barHeight = (height - 5) / sortedData.length
    const activeHeight = activeChartData.length * barHeight + 5

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max([...activeChartData, ...inactiveChartData])])
      .range([0, width - 300])

    let fontSize = (barHeight - 5) * 0.6
    if (fontSize > 15) {
      fontSize = 15
    }

    activeSelection
      .enter()
      .append('rect')
      .attr('y', (d: number, i: number) => barHeight * i)
      .attr('height', barHeight - 5)
      .attr('fill', '#4B9E985A')
      .attr('width', (d: number) => xScale(d) + 50)
      .attr('x', (d: number) => 150)

    activeSelection
      .enter()
      .append('text')
      .attr('x', (d: number) => 155)
      .attr('y', (d: number, i: number) => barHeight * i - 1 + (barHeight - fontSize) / 2)
      .attr('font-size', (d: number, i: number) => fontSize)
      .attr('dy', '.71em')
      .attr('text-anchor', 'start')
      .text((d: number, i: number) => getBidPriceText(activeBids[i], xScale(d) < shortenedCutoff))

    activeSelection
      .enter()
      .append('text')
      .attr('x', (d: number) => xScale(d) + 195)
      .attr('y', (d: number, i: number) => barHeight * i - 1 + (barHeight - fontSize) / 2)
      .attr('font-size', (d: number, i: number) => fontSize)
      .attr('dy', '.71em')
      .attr('text-anchor', 'end')
      .text((d: number, i: number) => getBidAmountText(activeBids[i], xScale(d) < shortenedCutoff))

    const lineContainer = svg.append('g')
    lineContainer
      .attr('class', 'line')
      .append('rect')
      .attr('y', activeHeight - 6)
      .attr('height', 1)
      .attr('fill', '#304FFE')
      .attr('width', width - 130)
      .attr('x', 130)

    lineContainer
      .append('rect')
      .attr('y', activeHeight - 5.5 - fontSize * 0.9)
      .attr('height', fontSize * 1.8)
      .attr('fill', '#304FFE')
      .attr('width', 90)
      .attr('x', 40)

    lineContainer
      .append('text')
      .attr('y', activeHeight - 5.5 - fontSize * 0.4)
      .attr('fill', '#FFF')
      .attr('x', 85)
      .attr('font-size', fontSize)
      .attr('dy', '.71em')
      .attr('text-anchor', 'middle')
      .text(() => `CP ${vsp.toFixed(2)} DAI`)

    if (inactiveChartData.length > 0) {
      const inactiveSelection = svg
        .append('g')
        .attr('class', 'inactiveSelection')
        .selectAll('rect')
        .data(inactiveChartData)

      inactiveSelection
        .enter()
        .append('rect')
        .attr('y', (d: number, i: number) => barHeight * i + activeHeight)
        .attr('height', barHeight - 5)
        .attr('fill', '#DDDDE3')
        .attr('width', (d: number) => xScale(d) + 50)
        .attr('x', (d: number) => 150)

      inactiveSelection
        .enter()
        .append('text')
        .attr('x', (d: number) => 155)
        .attr('y', (d: number, i: number) => barHeight * i + activeHeight - 1 + (barHeight - fontSize) / 2)
        .attr('font-size', (d: number, i: number) => fontSize)
        .attr('dy', '.71em')
        .attr('text-anchor', 'start')
        .text((d: number, i: number) => getBidPriceText(inactiveBids[i], xScale(d) < shortenedCutoff))

      inactiveSelection
        .enter()
        .append('text')
        .attr('x', (d: number) => xScale(d) + 195)
        .attr('y', (d: number, i: number) => barHeight * i + activeHeight - 1 + (barHeight - fontSize) / 2)
        .attr('font-size', (d: number, i: number) => fontSize)
        .attr('dy', '.71em')
        .attr('text-anchor', 'end')
        .text((d: number, i: number) => getBidAmountText(inactiveBids[i], xScale(d) < shortenedCutoff))
    }
  }

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr('width', width <= 32 ? 0 : width - 32)
      .attr('height', height)
      .style('border', 'none')
  }, [width])

  useEffect(() => {
    draw()
  }, [data, width, vsp])

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  )
}

export default BarChart
