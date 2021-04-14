/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as d3 from 'd3'
import { utils } from 'ethers'
import React, { useRef, useEffect } from 'react'

// Interfaces
import { Auction, AuctionBid } from 'src/interfaces/Auction'

interface BarChartComponentProps {
  width: number
  height: number
  data: AuctionBid[]
  userAddress: string
  vsp: number
  auction: Auction
}

export const BarChart: React.FC<BarChartComponentProps> = ({ width, height, data, userAddress, vsp, auction }) => {
  const ref = useRef<SVGSVGElement>(null)

  const getBidPricePerShare = (bid: AuctionBid) =>
    Number(utils.formatEther(bid.tokenIn)) / Number(utils.formatEther(bid.tokenOut))

  //const setBidPricePerShare = (bid: AuctionBid) => bid.price = bid.tokenIn.toNumber() / bid.tokenOut.toNumber()

  const getBidPriceText = (bid: AuctionBid, fontSize: number) => {
    return `${(Number(utils.formatEther(bid.tokenIn)) / Number(utils.formatEther(bid.tokenOut))).toFixed(2)}${
      Number(utils.formatEther(bid.tokenOut)) >= fontSize * 4
        ? ` ${auction.tokenIn?.symbol}/${auction.tokenOut?.symbol} `
        : ''
    }`
  }

  const getBidAmountText = (bid: AuctionBid, fontSize: number) => {
    return `${Number(utils.formatEther(bid.tokenOut)).toFixed(0)}${
      Number(utils.formatEther(bid.tokenOut)) >= fontSize * 3 ? `${auction.tokenOut?.symbol}` : ''
    }`
  }


  const draw = () => {
    if (width <= 232) {
      return
    }
    const svg = d3.select(ref.current)

    const sortedData = data.sort(
      (first, second) => getBidPricePerShare(second) - getBidPricePerShare(first)
    )
    const activeBids = sortedData.filter(item => getBidPricePerShare(item) >= 0.1)
    const inactiveBids = sortedData.filter(item => getBidPricePerShare(item) < 0.1)
    const activeChartData: any[] = activeBids.map(item => Number(utils.formatEther(item.tokenOut)))
    const inactiveChartData: any[] = inactiveBids.map(item => Number(utils.formatEther(item.tokenOut)))

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
      .text((d: number, i: number) => getBidPriceText(activeBids[i], fontSize))

    activeSelection
      .enter()
      .append('text')
      .attr('x', (d: number) => xScale(d) + 195)
      .attr('y', (d: number, i: number) => barHeight * i - 1 + (barHeight - fontSize) / 2)
      .attr('font-size', (d: number, i: number) => fontSize)
      .attr('dy', '.71em')
      .attr('text-anchor', 'end')
      .text((d: number, i: number) => getBidAmountText(activeBids[i], fontSize))

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
      .text(() => `CP ${vsp.toFixed(2)} ${auction.tokenIn?.symbol}`)

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
        .text((d: number, i: number) => getBidPriceText(inactiveBids[i], fontSize))

      inactiveSelection
        .enter()
        .append('text')
        .attr('x', (d: number) => xScale(d) + 195)
        .attr('y', (d: number, i: number) => barHeight * i + activeHeight - 1 + (barHeight - fontSize) / 2)
        .attr('font-size', (d: number, i: number) => fontSize)
        .attr('dy', '.71em')
        .attr('text-anchor', 'end')
        .text((d: number, i: number) => getBidAmountText(inactiveBids[i], fontSize))
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
