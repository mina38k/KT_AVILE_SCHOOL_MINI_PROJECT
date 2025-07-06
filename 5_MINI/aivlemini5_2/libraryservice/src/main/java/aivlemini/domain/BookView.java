package aivlemini.domain;

import javax.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BookView {

    private Long id;

    private String title;

    private String authorName;

    private String category;

    @Lob
    private String content;

    @Lob
    private String summaryContent;

    @Lob
    private String image;

    @Lob
    private String pdfPath;

    private Long price;

    private Boolean isBestSeller;

    private Long subscriptionCount;
}