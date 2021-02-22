import * as d3 from 'd3'
import { NumberValue } from 'd3'
import React, { useRef, useEffect } from 'react'

// Interfaces
import { AuctionBid } from 'src/interfaces/Auction'

interface BarChartComponentProps {
    width: number,
    height: number,
    data: AuctionBid[],
    userAddress: string,
    vsp: number
}

export const BarChart: React.FC<BarChartComponentProps> = ({ width, height, data, userAddress, vsp }) => {
    const ref = useRef<SVGSVGElement>(null)

    const getBidPricePerShare = (bid: AuctionBid) => bid.sellAmount.toNumber() / bid.buyAmount.toNumber()

    const getBidPriceText = (bid: AuctionBid, fontSize: number) => {
        return `${(bid.sellAmount.toNumber() / bid.buyAmount.toNumber()).toFixed(2)}${bid.buyAmount.toNumber() >= (fontSize * 4) ? ' DAI/XYZ' : ''}`
    }

    const getBidAmountText = (bid: AuctionBid, fontSize: number) => {
        return `${(bid.buyAmount.toNumber()).toFixed(0)}${bid.buyAmount.toNumber() >= (fontSize * 3) ? ' XYZ' : ''}`
    }

    const draw = () => {
        if (width <= 232) {
            return
        }
        const svg = d3.select(ref.current)
        const sortedData = data.sort((first, second) => (second.sellAmount.toNumber() - first.sellAmount.toNumber()))
        const activeBids = sortedData.filter(item => getBidPricePerShare(item) >= 0.1)
        const inactiveBids = sortedData.filter(item => getBidPricePerShare(item) < 0.1)
        const activeChartData: any[] = activeBids.map(item => item.buyAmount.toNumber())
        const inactiveChartData: any[] = inactiveBids.map(item => item.buyAmount.toNumber())
    
        svg.selectAll("g").remove()
        const activeSelection = svg.append("g").attr("class", "activeSelection").selectAll("rect").data(activeChartData)

        const barHeight = (height - 5) / sortedData.length
        const activeHeight = activeChartData.length * barHeight + 5

        const xScale = d3.scaleLinear()
            .domain([0, d3.max([...activeChartData, ...inactiveChartData])])
            .range([0, width - 300])

        let fontSize = (barHeight - 5) * 0.6
        if (fontSize > 15) {
            fontSize = 15
        }
        
        activeSelection
            .enter()
            .append("rect")
            .attr("y", (d: any, i: number) => barHeight * i)
            .attr("height", barHeight - 5)
            .attr("fill", "#4B9E985A")
            .attr("width", (d: any) => xScale(d) + 50)
            .attr("x", (d: any) => 150)
        
        activeSelection
            .enter()
            .append("text")
            .attr("x", (d: any) => 155)
            .attr("y", (d: any, i: number) => barHeight * (i) - 1 + (barHeight - fontSize) / 2)
            .attr("font-size", (d: any, i: number) => fontSize)
            .attr("dy", ".71em")
            .attr("text-anchor", "start")
            .text((d: any, i: number) => getBidPriceText(activeBids[i], fontSize))

        activeSelection
            .enter()
            .append("text")
            .attr("x", (d: any) => xScale(d) + 195)
            .attr("y", (d: any, i: number) => barHeight * (i) - 1 + (barHeight - fontSize) / 2)
            .attr("font-size", (d: any, i: number) => fontSize)
            .attr("dy", ".71em")
            .attr("text-anchor", "end")
            .text((d: any, i: number) => getBidAmountText(activeBids[i], fontSize))

        const lineContainer = svg.append("g")
        lineContainer.attr("class", "line")
            .append("rect")
            .attr("y", (d: any) => activeHeight - 6)
            .attr("height", 1)
            .attr("fill", "#304FFE")
            .attr("width", (d: any) => width - 130)
            .attr("x", (d: any) => 130)

        lineContainer.append("rect")
            .attr("y", (d: any) => activeHeight - 5.5 - fontSize * 0.9)
            .attr("height", fontSize * 1.8)
            .attr("fill", "#304FFE")
            .attr("width", (d: any) => 90)
            .attr("x", (d: any) => 40)

        lineContainer.append("text")
            .attr("y", (d: any) => activeHeight - 5.5 - fontSize * 0.4)
            .attr("fill", "#FFF")
            .attr("x", (d: any) => 85)
            .attr("font-size", (d: any, i: number) => fontSize)
            .attr("dy", ".71em")
            .attr("text-anchor", "middle")
            .text(() => `CP ${vsp.toFixed(2)} DAI`)

        if (inactiveChartData.length > 0) {

            const inactiveSelection = svg.append("g").attr("class", "inactiveSelection").selectAll("rect").data(inactiveChartData)

            inactiveSelection
                .enter()
                .append("rect")
                .attr("y", (d: any, i: number) => (barHeight * i) + activeHeight)
                .attr("height", barHeight - 5)
                .attr("fill", "#DDDDE3")
                .attr("width", (d: any) => xScale(d) + 50)
                .attr("x", (d: any) => 150)
            
            inactiveSelection
                .enter()
                .append("text")
                .attr("x", (d: any) => 155)
                .attr("y", (d: any, i: number) => barHeight * (i) + activeHeight - 1 + (barHeight - fontSize) / 2)
                .attr("font-size", (d: any, i: number) => fontSize)
                .attr("dy", ".71em")
                .attr("text-anchor", "start")
                .text((d: any, i: number) => getBidPriceText(inactiveBids[i], fontSize))

            inactiveSelection
                .enter()
                .append("text")
                .attr("x", (d: any) => xScale(d) + 195)
                .attr("y", (d: any, i: number) => barHeight * (i) + activeHeight - 1 + (barHeight - fontSize) / 2)
                .attr("font-size", (d: any, i: number) => fontSize)
                .attr("dy", ".71em")
                .attr("text-anchor", "end")
                .text((d: any, i: number) => getBidAmountText(inactiveBids[i], fontSize))
        }
    }

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width <= 32 ? 0 : width - 32)
            .attr("height", height)
            .style("border", "1px solid black")
    }, [width])

    useEffect(() => {
        draw()
    }, [data, width, vsp])

    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
    )
}

export default BarChart
