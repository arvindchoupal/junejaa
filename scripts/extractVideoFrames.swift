import AVFoundation
import AppKit
import Foundation

guard CommandLine.arguments.count == 3 else {
    fatalError("Usage: extractVideoFrames input.mp4 output-directory")
}

let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)

let asset = AVURLAsset(url: input)
let duration = CMTimeGetSeconds(asset.duration)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero

let frameCount = 12
for index in 0..<frameCount {
    let second = duration * Double(index) / Double(frameCount - 1)
    let image = try generator.copyCGImage(at: CMTime(seconds: second, preferredTimescale: 600), actualTime: nil)
    let bitmap = NSBitmapImageRep(cgImage: image)
    guard let data = bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.84]) else { continue }
    let filename = String(format: "frame-%02d-%.1fs.jpg", index + 1, second)
    try data.write(to: output.appendingPathComponent(filename))
}

print("Extracted \(frameCount) frames across \(String(format: "%.1f", duration)) seconds")
