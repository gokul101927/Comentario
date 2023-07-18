package com.app.comentarioserver.imagekit_upload;

import com.app.comentarioserver.pojo.ImageData;
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.exceptions.*;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Configuration
@Slf4j
@Data
@RequiredArgsConstructor
public class ImageUpload {

    private final ImageKit imageKit;

    public ImageData uploadImage(MultipartFile image, String path) throws IOException, ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException {
        byte[] imageBytes = image.getBytes();
        FileCreateRequest fileCreateRequest = new FileCreateRequest(imageBytes, "filename");
        fileCreateRequest.setFolder("Comentario/" + path);
        Result result = imageKit.upload(fileCreateRequest);
        return new ImageData(result.getUrl(), result.getFileId());
    }

    public void deleteImage(String fileId) throws ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException {
        ImageKit.getInstance().deleteFile(fileId);
    }

}
